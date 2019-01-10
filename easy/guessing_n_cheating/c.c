#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#define MAX(x, y) (((x) > (y)) ? (x) : (y))
#define MIN(x, y) (((x) < (y)) ? (x) : (y))
int main()
{
    int above = 0, below = 101, R, i;
    scanf("%d", &R); fgetc(stdin);
    for (i = 0; i < R; i++) {
        char voids[256];
        char line[256];
        int val;
        scanf("%d %s %s\n", &val, voids, line);

        if (strcmp("high", line) == 0) {
            if (above+2 > val)
                break;
            below = MIN(below, val);
        } else if (strcmp("low", line) == 0) {
            if (below-2 < val)
                break;
            above = MAX(above, val);
        } else if (strcmp("on", line) == 0) {
            if (val >= below || val <= above || i != R-1)
                break;
        }

        // fprintf(stderr, "%s", line);
    }

    if (i < R)
        printf("Alice cheated in round %d\n", i+1);
    else
        printf("No evidence of cheating\n");

    return 0;
}