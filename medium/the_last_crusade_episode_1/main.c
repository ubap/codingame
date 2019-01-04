#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <assert.h>

#define DIR_LR "LEFT"
#define DIR_RL "RIGHT"
#define DIR_UD "TOP"

int x, y;
char* dir;

void type0() {
    assert(!"can not walk on this field");
}
void type1() {
    dir = DIR_UD; y++;
}
void type2() {
    assert(dir != DIR_UD || "invalid dir");
    if (dir == DIR_LR) x++;
    else if (dir == DIR_RL) x--;
}
void type3() {
    assert(dir == DIR_UD || "invalid dir");
    y++;
}
void type4() {
    assert(dir == DIR_LR || "invalid dir");
    if (dir == DIR_UD) x--;
    else if (dir == DIR_RL) y++;
}
void type5() {
    assert(dir != DIR_RL || "invalid dir");
    if (dir == DIR_UD) x++;
    else if (dir == DIR_LR) y++;
}
void type6() {
    assert(dir != DIR_UD);
    if (dir == DIR_RL) x--;
    else if (dir == DIR_LR) x++;
}
void type7() {
    if (dir == DIR_LR) assert(!"invalid dir");
    y++;
}
void type8() {
    if (dir == DIR_UD) assert(!"invalid dir");
    y++;
}
void type9() {
    assert(dir != DIR_RL);
    y++;
}
void type10() {
    if (dir != DIR_UD) assert(!"invalid dir");
    x--;
}
void type11() {
    if (dir != DIR_UD) assert(!"invalid dir");
    x++;
}
void type12() {
    assert(dir == DIR_RL);
    y++;
}
void type13() {
    if (dir != DIR_LR) assert(!"invalid dir");
    y++;
}

int main()
{
    void (*types[20]) ();
    types[0] = type0;
    types[1] = type1;
    types[2] = type2;
    types[3] = type3;
    types[4] = type4;
    types[5] = type5;
    types[6] = type6;
    types[7] = type7;
    types[8] = type8;
    types[9] = type9;
    types[10] = type10;
    types[11] = type11;
    types[12] = type12;
    types[13] = type13;


    int W; // number of columns.
    int H; // number of rows.
    scanf("%d%d", &W, &H); fgetc(stdin);

    int *map = malloc(sizeof(int) * H *W );
    assert(map || "couldn't alloc memory for map");

    for (int i = 0; i < H; i++) {
        for (int j = 0; j < W; j++) {
            int room;
            scanf("%d", &room);
            fgetc(stdin);
            fprintf(stderr, "(j*W) + i = %d, room = %d\n", (i*W) + j, room);
            map[(i*W) + j] = room;
        }
    }

    int EX; // the coordinate along the X axis of the exit (not useful for this first mission, but must be read).
    scanf("%d", &EX);

    // game loop
    while (1) {
        char POS[6];
        scanf("%d%d%s", &x, &y, POS);
        if (strcmp(POS, DIR_UD) == 0) dir = DIR_UD;
        if (strcmp(POS, DIR_RL) == 0) dir = DIR_RL;
        if (strcmp(POS, DIR_LR) == 0) dir = DIR_LR;

        int type = map[y*W + x];
        fprintf(stderr, "x=%d, y=%d, dir=%s, type=%d\n", x, y, dir, type);
        types[type]();


        // One line containing the X Y coordinates of the room in which you believe Indy will be on the next turn.
        printf("%d %d\n", x, y);
    }

    return 0;
}