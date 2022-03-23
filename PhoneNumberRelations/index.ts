import { strict as assert } from "assert";

class TreeNode<T> {

    public value: T;
    private parent?: TreeNode<T>;
    private children: TreeNode<T>[] = [];

    constructor(value: T) {
        this.value = value;
    }

    addChild(node: TreeNode<T>) {
        this.children.push(node);
        node.parent = this;
    }

    findChildByValue(value: T): TreeNode<T> | undefined {
        return this.children.find((node) => node.value == value);
    }

    toGraphString(): string {
        const parentCount = this.countParents();

        let graph = `${this.value}`;
        if (this.children.length > 0) {
            this.children.forEach((child, index) => {
                let indent = "";
                if (index > 0) {
                    indent = "\n".repeat(index) + " " + "    ".repeat(parentCount);
                }
                graph += `${indent} - ${child.toGraphString()}`;
            });
        }

        return graph;
    }

    totalCount(): number {
        const root = (this.parent == null) ? 1 : 0;
        return root +
            this.children.length +
            this.children.reduce((prev, node) => prev + node.totalCount(), 0);
    }

    private countParents(): number {
        return this.traverseParents().length;
    }

    private traverseParents(): TreeNode<T>[] {
        const parents: TreeNode<T>[] = [];
        let currentParent = this.parent;
        while (currentParent != null) {
            parents.push(currentParent);
            currentParent = currentParent.parent;
        }

        return parents;
    }
}

function main() {
    const entries = [
        "2365498756",
        "2365498765",
        "0123987654",
        "0123456789",
        "0123987456",
    ];

    const graph: TreeNode<String>[] = [];
    entries.sort().forEach((entry) => {
        let tmpNode = graph.find((node) => node.value == entry[0]);
        if (tmpNode == null) {
            const newNode = new TreeNode(entry[0]);
            graph.push(newNode);
            tmpNode = newNode;
        }

        entry.substring(1).split("").forEach((char) => {
            let childNode = tmpNode!.findChildByValue(char);
            if (childNode == null) {
                const newNode = new TreeNode(char);
                tmpNode!.addChild(newNode);
                childNode = newNode;
            }
            tmpNode = childNode;
        });
    });

    const totalCount = graph.reduce((prev, node) => prev + node.totalCount(), 0);
    assert.equal(totalCount, 31);
    console.log(totalCount + "\n");

    graph.forEach((tree) => {
        console.log(tree.toGraphString());
    });
}


// It should print:
//
//   /usr/local/bin/node -r ts-node/register PhoneNumberRelations/index.ts
//   31
//
//   0 - 1 - 2 - 3 - 4 - 5 - 6 - 7 - 8 - 9
//                 - 9 - 8 - 7 - 4 - 5 - 6
//                             - 6 - 5 - 4
//   2 - 3 - 6 - 5 - 4 - 9 - 8 - 7 - 5 - 6
//                                 - 6 - 5
main();
