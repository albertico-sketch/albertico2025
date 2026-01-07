import { servicesService } from '../local/services.js'

export const getServices = async () => {
  return await servicesService.getServices()
}