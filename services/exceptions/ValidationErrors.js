import _ from 'lodash'
class ValidationError {
  constructor({ data }) {
    this.errors = data.errors
  }

  getErrors() {
    return this.errors
  }
}

export default ValidationError;
