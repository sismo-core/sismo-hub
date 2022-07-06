import InfrastructureServices from "./infrastructure"
import localInfrastructure from "./local-infrastructure"

let _infrastructureServices: InfrastructureServices | undefined;

const setInfrastructureServices = (infrastructureServices: InfrastructureServices) : void => {
  if (_infrastructureServices) {
    throw Error("Infrastructure must be set only once.")
  }
  _infrastructureServices = infrastructureServices
};

const getInfrastructureServices = () : InfrastructureServices => {
  if (!_infrastructureServices) {
    throw Error("Infrastructure must be set before use.")
  }
  return _infrastructureServices;
};

export {
  InfrastructureServices,
  localInfrastructure,
  getInfrastructureServices,
  setInfrastructureServices,
}
