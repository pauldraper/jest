/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {deserialize as v8Deserialize, serialize as v8Serialize} from 'v8';
import * as fs from 'graceful-fs';

// JSON and V8 serializers are both stable when it comes to compatibility. The
// current JSON specification is well defined in RFC 8259, and V8 ensures that
// the versions are compatible by encoding the serialization version in the own
// generated buffer.

// In memory functions.

export function deserialize(buffer: Buffer): unknown {
  return v8Deserialize(buffer);
}

export function serialize(content: unknown): Buffer {
  return v8Serialize(content);
}

// Synchronous filesystem functions.

export function readFileSync(filePath: string): unknown {
  return v8Deserialize(fs.readFileSync(filePath));
}

export function writeFileSync(filePath: string, content: unknown): void {
  return fs.writeFileSync(filePath, v8Serialize(content));
}

export default {
  deserialize,
  readFileSync,
  serialize,
  writeFileSync,
};
