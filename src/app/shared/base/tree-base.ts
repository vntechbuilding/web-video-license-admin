import { FlatTreeControl } from '@angular/cdk/tree';
import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';
interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
export declare type TreeContent = {
  children: TreeContent[];
  title: string;
};
export abstract class TreeBase<T extends TreeContent> {
  private transformer = (node: T, level: number): FlatNode => ({
    ...node,
    expandable: !!node.children && node.children.length > 0,
    name: node.title,
    level,
  });

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new NzTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children as any
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

  showLeafIcon = false;

  hasChild = (_: number, node: FlatNode): boolean => node.expandable;
}
