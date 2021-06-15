// import { response } from 'express';
// import { validationResult } from 'express-validator';

export default class ErrorResponse extends Error {
  constructor(message, statusCode, origin) {
    super(message);
    this.statusCode = statusCode;
    this.origin = origin;
  }
}

// const errors = validationResult(req)
// if(!errors.isEmpty()) {
//   const err = new ErrorResponse('something wrong with validation', 400, 'express-validator');
// err.errorList = errors
// } else {
//   res.status(200).send({
//     success: true,
//     data: ourDataArray
//   })
// }
