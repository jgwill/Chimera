export enum Power {
  Life = "Life",
  Love = "Love",
  Intelligence = "Intelligence",
  Soul = "Soul",
  Principle = "Principle",
  Truth = "Truth",
  Structure = "Structure",
  Emergence = "Emergence",
  None = "None",
}

export interface StoryChoice {
  id: string;
  text: string;
  power: Power;
}

export interface StorySegment {
  id: string;
  text: string;
  powerInFocus: Power;
  isUserChoice: boolean; // To differentiate between AI narrative and user choice text
  timestamp: Date;
}

export interface PowerInfo {
  name: Power;
  color: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
