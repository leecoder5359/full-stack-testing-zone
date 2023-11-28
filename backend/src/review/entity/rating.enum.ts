import { ValueTransformer } from 'typeorm';

export enum RatingEnum {
    Zero = 0,
    Half = 0.5,
    One = 1,
    OneAndHalf = 1.5,
    Two = 2,
    TwoAndHalf = 2.5,
    Three = 3,
    ThreeAndHalf = 3.5,
    Four = 4,
    FourAndHalf = 4.5,
    Five = 5,
}

export const ratingTransformer: ValueTransformer = {
    to(value: number): RatingEnum {
        return value as RatingEnum;
    },
    from(value: RatingEnum): number {
        return value as number;
    },
};