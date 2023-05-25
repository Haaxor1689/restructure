import { Base } from './Base';
import { DecodeStream } from './DecodeStream';
import { Number as NumberT } from './Number';
import * as utils from './utils';

export class BufferT extends Base<Buffer> {
  length: Base<unknown>;

  constructor(length: Base<unknown>) {
    super();
    this.length = length;
  }

  decode(stream: DecodeStream, parent: unknown) {
    const length = utils.resolveLength(this.length, stream, parent);
    return stream.readBuffer(length);
  }

  size(val: Buffer, parent: unknown) {
    if (!val) {
      return utils.resolveLength(this.length, null, parent);
    }

    let len = val.length;
    if (this.length instanceof NumberT) {
      len += this.length.size();
    }

    return len;
  }

  encode(stream, buf, parent) {
    if (this.length instanceof NumberT) {
      this.length.encode(stream, buf.length);
    }

    return stream.writeBuffer(buf);
  }
}

export { BufferT as Buffer };
