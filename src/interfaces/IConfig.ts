export default interface IConfig {
    reels?: IReelsConfig,
    preload?: {
        [key: string]: string;
    }
}

export interface IReelsConfig {
    bg: string;
    reelsCount: number;
    slotsCount: number;
    preload?: {
        filesCount: number;
        urlTemplate: string;
    }
}