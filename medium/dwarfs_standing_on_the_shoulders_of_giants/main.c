#include <stdlib.h>
#include <stdio.h>
#include <string.h>

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

void add_relationship(int* dwarf, int dwarf_id) {
    dwarf[1 + dwarf[0]++] = dwarf_id;
}

int get_relationship_count(int* dwarf) {
    return dwarf[0];
}

int dfs(int** dwarfs, int id) {
    int maxDepth = 0;
    int relationship_count = get_relationship_count(dwarfs[id]);
    for (int i = 0; i < relationship_count; i++) {
        int currDepth = dfs(dwarfs, dwarfs[id][i+1]);
        if (currDepth > maxDepth) {
            maxDepth = currDepth;
        }
    }
    return maxDepth + 1;
}

int main()
{
    /**
     * First entry of each dwarf is a relationship count
     */
    int** dwarfsAtoB = malloc(sizeof(int*) * 10000);
    int** dwarfsBtoA = malloc(sizeof(int*) * 10000);
    int8_t* dwarfsMap = calloc(10000, sizeof(int8_t));
    for (int i = 0; i < 10000; i++) {
        dwarfsAtoB[i] = calloc(10001, sizeof(int));
        dwarfsBtoA[i] = calloc(10001, sizeof(int));
    }

    int n; // the number of relationships of influence
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        int x; // a relationship of influence between two people (x influences y)
        int y;
        scanf("%d%d", &x, &y);
        add_relationship(dwarfsAtoB[x], y);
        add_relationship(dwarfsBtoA[y], x);
        dwarfsMap[x] = 1;
        dwarfsMap[y] = 1;
    }

    int maxDepth = 0;
    for (int i = 0; i < 10000; i++) {
        if (dwarfsMap[i] == 0) continue;

        if (get_relationship_count(dwarfsBtoA[i]) != 0) continue;

        int depth = dfs(dwarfsAtoB, i);
        maxDepth = depth > maxDepth ? depth : maxDepth;

        fprintf(stderr, "canditate=%d, depth=%d\n", i, depth);
    }

    // The number of people involved in the longest succession of influences
    printf("%d\n", maxDepth);

    return 0;
}