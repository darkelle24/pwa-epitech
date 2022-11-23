import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiConsumes, ApiBody, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { fileMimetypeFilter } from './file-mimetype-filter';
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, Options } from 'multer';
import { ErrorFileInterceptor } from "@FileUploadHelpers/error-file.interceptor";

const defaultConfig: Options = {
  dest: process.env.FILE_DEST
}

export function ApiImageFile(
  fileName: string = 'image',
  required: boolean = false,
) {
  return ApiFile(fileName, required, {
    fileFilter: fileMimetypeFilter('image'),
  });
}

export function ApiPdfFile(
  fileName: string = 'document',
  required: boolean = false,
) {
  return ApiFile(fileName, required, {
    fileFilter: fileMimetypeFilter('pdf'),
  });
}

export function ApiFile(
  fieldName: string,
  required: boolean = true,
  localOptions?: Options
) {
  const object3 = { ...defaultConfig, ...localOptions }
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, object3)),
    UseInterceptors(new ErrorFileInterceptor()),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: required ? [fieldName] : [],
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  )
}