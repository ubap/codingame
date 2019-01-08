#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#define MAX_STEPS 10000
#define SOUTH "SOUTH"
#define EAST "EAST"
#define NORTH "NORTH"
#define WEST "WEST"

struct position_t {
    int x, y;
};

int height, width;
char map[101][102];
struct position_t *teleport1, *teleport2;

const char* directions_regular[] = {SOUTH, EAST, NORTH, WEST};
const char* directions_inverted[] = {WEST, NORTH, EAST, SOUTH};



struct position_t position;
const char** directions = directions_regular;
char* direction = SOUTH;
int breaker_mode = 0;


int is_path_modifier(char next) {
    return next == 'N' || next == 'W' || next == 'S' || next == 'E';
}
int is_obstacle(char next) {
    return next == '#' || (!breaker_mode && next == 'X');
}
int is_beer(char next) {
    return next == 'B';
}
int is_inverter(char next) {
    return next == 'I';
}
int is_consumable(char next) {
    return next == 'X';
}
int is_teleport(struct position_t given_pos) {
    if (teleport1 == NULL) return 0;
    return (given_pos.x == teleport1->x && given_pos.y == teleport1->y)
        || (given_pos.x == teleport2->x && given_pos.y == teleport2->y);
}

struct position_t teleport(struct position_t given_pos) {
    if (given_pos.x == teleport1->x && given_pos.y == teleport1->y)
        return *teleport2;
    else
        return *teleport1;
}

char* apply_path_modifier(char next) {
    if (next == 'N') return NORTH;
    if (next == 'W') return WEST;
    if (next == 'S') return SOUTH;
    if (next == 'E') return EAST;
    return NULL;
}
const char** inverted_directions() {
    if (directions == directions_regular)
        return directions_inverted;
    else
        return directions_regular;
}

struct position_t transform_position(struct position_t given_pos, char* given_direction) {
    struct position_t ret_position;
    if (given_direction == SOUTH) {
        ret_position.x = given_pos.x;
        ret_position.y = given_pos.y + 1;
    } else if (given_direction == EAST) {
        ret_position.x = given_pos.x + 1;
        ret_position.y = given_pos.y;
    } else if (given_direction == NORTH) {
        ret_position.x = given_pos.x;
        ret_position.y = given_pos.y - 1;
    } else if (given_direction == WEST) {
        ret_position.x = given_pos.x - 1;
        ret_position.y = given_pos.y;
    }
    return ret_position;
}

char* transform_direction(struct position_t given_pos) {
    for (int i = 0; i < 4; i++) {
        struct position_t next_pos = transform_position(given_pos, directions[i]);
        char next = map[next_pos.y][next_pos.x];
        if (!is_obstacle(next)) return directions[i];
    }
    return NULL;
}

void find_start_pos_and_teleporters() {
    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            if (map[i][j] == '@') {
                map[i][j] = ' ';
                position.x = j;
                position.y = i;
            } else if (map[i][j] == 'T') {
                if (teleport1 == NULL) {
                    teleport1 = malloc(sizeof(struct position_t));
                    teleport1->x = j;
                    teleport1->y = i;
                } else {
                    teleport2 = malloc(sizeof(struct position_t));
                    teleport2->x = j;
                    teleport2->y = i;
                }
            }
        }
    }
}

int main()
{

    scanf("%d%d", &height, &width); fgetc(stdin);
    for (int i = 0; i < height; i++) {
        fgets(map[i], 102, stdin);
    }

    find_start_pos_and_teleporters();

    int stepCount = 0;
    char* steps[MAX_STEPS];

    while (stepCount < MAX_STEPS) {
        if (is_teleport(position)) {
            position = teleport(position);
        }

        char current = map[position.y][position.x];
        if (current == '$') break;

        if (is_path_modifier(current)) {
            direction = apply_path_modifier(current);
        } else if (is_beer(current)) {
            breaker_mode = !breaker_mode;
        } else if (is_inverter(current)) {
            directions = inverted_directions();
        }

        struct position_t next_position;
        char next;
        do {
            next_position = transform_position(position, direction);
            next = map[next_position.y][next_position.x];
            if (is_obstacle(next)) {
                direction = transform_direction(position);
            }
        } while (is_obstacle(next));

        if (is_consumable(current)) {
            map[position.y][position.x] = ' ';
        }
        position = next_position;
        steps[stepCount++] = direction;
    }

    if (stepCount == MAX_STEPS) {
        printf("LOOP\n");
    } else {
        for (int i = 0; i < stepCount; i++) {
            printf("%s\n", steps[i]);
        }
    }
    
    return 0;
}