import IAddress from "./IAddress";

interface ICustomer {
  get id(): string;
  get name(): string;
  get address(): IAddress;
  get rewardPoints(): number;
  isActive(): boolean;
  activate(): void;
  addRewardPoints(points: number): void;
}

export default ICustomer;