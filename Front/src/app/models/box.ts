export interface BoxInterface {
  name: string,
  description: string,
  _id: string,
  connected: boolean,
  running: boolean,
  ports: PortInterface[]
}

export interface PortInterface {
  pin: number,
  activated: boolean, // l utilisateur qui choisi
  running: boolean, // Si recoit donner
  name: string,
  device?: SensorInterface | TriggerInterface,
  protocols: string[]
}

export interface SensorInterface {
  deviceModel: string,
  type: 'sensor',
  measurementParameters: ParametersType[],
  protocol: string
}

export interface TriggerInterface {
  deviceModel: string,
  type: 'trigger',
  protocol: string
}

export interface ParametersType {
  name: string,
  dataType: string,
  min: number,
  max: number
}

const TempParameters: ParametersType = {
  name: 'temperature',
  dataType: 'number',
  min: -10,
  max: 100
}

const HumidityParameters: ParametersType = {
  name: 'humitdity',
  dataType: 'number',
  min: -10,
  max: 100
}

const LuminosityParameters: ParametersType = {
  name: 'luminosity',
  dataType: 'number',
  min: -10,
  max: 100
}

const OnParameters: ParametersType = {
  name: 'On',
  dataType: 'boolean',
  min: -10,
  max: 100
}

export const Device1: SensorInterface = {
  deviceModel: 'Arduino basic capteur temp and humidity',
  type: 'sensor',
  measurementParameters: [
    TempParameters,
    HumidityParameters,
    LuminosityParameters
  ],
  protocol: 'lol'
}

export const Device3: SensorInterface = {
  deviceModel: 'Arduino basic capteur for luminosity',
  type: 'sensor',
  measurementParameters: [
    LuminosityParameters,
  ],
  protocol: 'lol'
}

export const Device2: TriggerInterface = {
  deviceModel: 'LED',
  type: 'trigger',
  protocol: 'lol'
}

export const Device4: SensorInterface = {
  deviceModel: 'Switch',
  type: 'sensor',
  measurementParameters: [
    OnParameters,
  ],
  protocol: 'lol'
}

export const FakeBox: BoxInterface = {
  _id: 'qdsqdsdqsqd',
  running: true,
  connected: true,
  name: 'dqsdqsssssssssssssssssssssssssssssssssssssssssssssssssd qs dsq qsd qsd qsd qs qsd dqsdqsssssssssssssssssssssssssssssssssssssssssssssssssd qs dsq qsd qsd qsd qs qsd',
  description: 'dqsdqsssssssssd dqsdqsssssssssssssssd dqsdqssssssssssssssssssssd dqssssssd dqsdqssssssssssssd dqsdqsssssssssssssssssssd dqsdqssssssssssssssssssssssd dqsd dsssss dqsdqssssss qs dsq qsd qsd qsd qs qsd dqsdqssssssssssssssd qs dsq qsd qsd qsd qs qsd',
  ports: [
    { pin: 1, device: Device1, name: 'lol1', activated: true, running: true, protocols: ['lol'] },
    { pin: 2, device: Device2, activated: false, running: false, name: 'lol2', protocols: ['lol'] },
    { pin: 3, device: Device4, activated: false, running: false, name: 'lol3', protocols: ['lol']}
  ]
}
