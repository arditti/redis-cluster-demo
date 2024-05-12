import { CLUSTER_MAX_SLOT } from '../../redis/const.ts';
import * as encrypt from '../../redis/encrypt.ts';
import { HASHTAG_TEXT } from './consts.ts';

export const getExplanationText = (key: string): string | void=>{
    const keyHash = encrypt.hashKey(key); 
    if (!keyHash) return;
    const keyUsedForHash = encrypt.getKeyToHash(key);
    const isHashTagText = key !== keyUsedForHash;
    const hashTagText = isHashTagText ? `${HASHTAG_TEXT} been used, ` : '';
    
    return `${hashTagText}The '${keyUsedForHash}' CRC16 hash is ${keyHash} mod ${CLUSTER_MAX_SLOT} = slot ${keyHash % CLUSTER_MAX_SLOT}`;
};