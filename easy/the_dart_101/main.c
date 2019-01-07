#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <limits.h>

#define MISS -20
/**
 * Accepted tokens formats "10", "10*5", "X"
 * @param token
 * @return MISS when "X" is passed, value otherwise.
 */
int get_value(char* token) {
    // check if token contains '*'
    char first_number[8]; memset(first_number, 0, 8);
    char second_number[8]; memset(second_number, 0, 8);

    char* current_number = first_number;
    int second_number_position = 0;
    int token_length = strlen(token);
    for (int i = 0; i < token_length; i++) {
        if (token[i] == '*') {
            current_number = second_number;
            second_number_position = i + 1;
            continue;
        }
        current_number[i - second_number_position] = token[i];
    }

    int ret_val = MISS;
    if (second_number[0] != '\0') {
        ret_val = atoi(first_number) * atoi(second_number);
    } else if (first_number[0] != 'X') {
        ret_val = atoi(first_number);
    }
    return ret_val;
}

int main()
{
    int playersCount;
    scanf("%d", &playersCount); fgetc(stdin);

    char** playerNames = malloc(sizeof(char*) * playersCount);
    char** playerShots = malloc(sizeof(char*) * playersCount);
    int* playerScores = calloc(playersCount, sizeof(int));
    int* playerTurns = calloc(playersCount, sizeof(int));

    for (int i = 0; i < playersCount; i++) {
        playerNames[i] = malloc(1025);
        fgets(playerNames[i], 1025, stdin);
    }
    for (int i = 0; i < playersCount; i++) {
        playerShots[i] = malloc(1025);
        fgets(playerShots[i], 1025, stdin);
    }

    // simulate all the throws
    int throws_in_a_turn[3];
    for (int player = 0; player < playersCount; player++) {
        int throw = 0;
        int sub_sum = 0;
        // then count how many throws / turns it did take for a player to win
        char* token = strtok(playerShots[player], " ");
        while (token != NULL) {
            if (throw == 0) {
                playerTurns[player]++;
                sub_sum = 0;
            }

            // printf("token %s", token);
            int value = get_value(token);
            throws_in_a_turn[throw++] = value;
            sub_sum += value;

            if (playerScores[player] + sub_sum == 101) {
                playerScores[player] = 101;
                break;
            }

            if (playerScores[player] + sub_sum > 101) {
                throw = 0;
            } else if (throw == 3
                        && throws_in_a_turn[0] == MISS && throws_in_a_turn[1] == MISS && throws_in_a_turn[2] == MISS) {
                // three missess in a row
                playerScores[player] = 0;
                throw = 0;
            } else if (throw == 3) {
                if ((throws_in_a_turn[0] == MISS && throws_in_a_turn[1] == MISS)
                        || (throws_in_a_turn[1] == MISS && throws_in_a_turn[2] == MISS)) {
                    // If you miss twice consecutively in the same round, your total is decreased by another 10 points.
                    sub_sum -= 10;
                }

                // regular round
                playerScores[player] += sub_sum;
                throw = 0;
            }

            token = strtok(NULL, " ");
        }
    }

    // filter players who scores 101 points
    int* playersWhoScored101 = malloc(sizeof(int) * playersCount);
    int playersWhoScored101Count = 0;
    for (int i = 0; i < playersCount; i++) {
        if (playerScores[i] == 101) {
            playersWhoScored101[playersWhoScored101Count++] = i;
        }
    }

    // find the one who did it in fewest turns
    int fewestTurns = INT_MAX;
    int winnerPlayer = 0;
    for (int i = 0; i < playersWhoScored101Count; i++) {
        int player = playersWhoScored101[i];
        if (playerTurns[player] < fewestTurns) {
            fewestTurns = playerTurns[player];
            winnerPlayer = player;
        }
    }

    printf("%s", playerNames[winnerPlayer]);

    return 0;
}