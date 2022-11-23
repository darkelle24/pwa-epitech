import * as morgan from 'morgan'
import * as rfs from "rotating-file-stream"

function formatDate(d: Date): string {
  let month = '' + (d.getMonth() + 1).toString()
  let day = '' + d.getDate().toString()
  const year = d.getFullYear().toString()
  let hour = d.getHours().toString()

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  if (hour.length < 2)
    hour = '0' + hour;

  return [year, month, day, hour].join('-');
}

export function activateLogs(app: any) {
  const generator = (time: Date, index?: number) => {
    if (!time) return "access.log";

    return [formatDate(time), index, 'access.log'].join('-');
  };

  morgan.token('auth', function (req: any) {
    if (!req.user) {
      return 'Is not authenticated'
    } else {
      return "id: " + req.user.id + " username: " + req.user.username + " role: " + req.user.role
    }
  })

  morgan.token('statusMessage', function (req: any, res: any) {
    return res.statusMessage
  })

  const accessLogStream = rfs.createStream(generator, {
    path: 'logs',
    maxFiles: 31,
    intervalBoundary: true,
    interval: "1d",
    initialRotation: true
  })

  app.use(morgan(':remote-addr - :auth - [:date[web]] ":method :url HTTP/:http-version" :status ":statusMessage" :res[content-length] ":referrer" ":user-agent" - :response-time ms', { stream: accessLogStream }))
}