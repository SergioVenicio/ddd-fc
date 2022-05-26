import IAddress from "./IAddress"
import Notification from '../../@shared/notification/notification'


interface ICustomer {
  get id(): string
  get name(): string
  get address(): IAddress
  get rewardPoints(): number

  isActive(): boolean
  activate(): void
  addRewardPoints(points: number): void
}

export default ICustomer