export interface ICard {
  id: string;
  name: string;
  age: number;
  grade: number;
  onSale: boolean;
  position: string;
  rarity: string;
  player: {
    matchName: string;
    country: {
      code: string;
    };
    pictureUrl: string;
  };
}
