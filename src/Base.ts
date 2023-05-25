import { DecodeStream } from './DecodeStream';
import { EncodeStream } from './EncodeStream';

export class Base<T> {
  decode(stream: DecodeStream): T {
    throw Error('Tried to call decode on base.');
  }

  encode(stream: EncodeStream, value: T) {
    throw Error('Tried to call encode on base.');
  }

  size(value?: T): number {
    throw Error('Tried to call size on base.');
  }

  fromBuffer(buffer: Buffer) {
    let stream = new DecodeStream(buffer);
    return this.decode(stream);
  }

  toBuffer(value: T) {
    let size = this.size(value);
    let buffer = new Uint8Array(size);
    let stream = new EncodeStream(buffer);
    this.encode(stream, value);
    return buffer;
  }
}
