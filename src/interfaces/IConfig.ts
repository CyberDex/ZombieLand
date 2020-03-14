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
    }
}