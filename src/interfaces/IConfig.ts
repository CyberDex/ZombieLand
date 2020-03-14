export default interface IConfig {
    reels?: IReelsConfig,
    globalAssets?: {
        [key: string]: string;
    }
}

export interface IReelsConfig {
    bg: string;
    reelsCount: number;
    slotsCount: number;
    slotsAssets?: {
        filesCount: number;
        urlTemplate: string;
    },
    maskSize: {
        xPersentage: number;
        yPersentage: number;
        offsetX: number;
        offsetY: number;
    }
    framesCount: {
        [key: number]: number;
    }
}