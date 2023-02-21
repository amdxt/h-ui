import type { Plugin } from 'vite';
export interface CopyPath {
    from: string;
    to: string;
    type: 'folder' | 'file';
}
export interface CopyOptions {
    paths: CopyPath[];
}
export declare function copy(options: CopyOptions): Plugin;
