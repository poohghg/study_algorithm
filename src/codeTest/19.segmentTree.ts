import { SegmentTree } from '../dataStructure/SegmentTree';

const t = new SegmentTree([1, 2, 3, 4, 5, 6]);

for (let i = 0; i < 1; i++) {
  console.log(t.query(0, i));
}
