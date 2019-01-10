#include <stdlib.h>
#include <stdio.h>
#include <string.h>

void inc_char(char *c, int times) {
    times = times % ('Z' - 'A' + 1);
    *c = *c + (char)times;
    if (*c > 'Z') *c = *c - (char)('Z' - 'A' + 1);
    if (*c < 'A') *c = *c + (char)('Z' - 'A' + 1);
}

char decode(char c, char* rotor) {
    for (int i = 0; i < 26; i++) {
        if (rotor[i] == c) {
            return 'A' + i;
        }
    }
    return 127;
}

int main()
{
    char operation[257];
    scanf("%s\n", operation);
    int pseudoRandomNumber;
    scanf("%d\n", &pseudoRandomNumber);
    char rotors[3][27];
    scanf("%s\n", rotors[0]);
    scanf("%s\n", rotors[1]);
    scanf("%s\n", rotors[2]);
    char message[1025];
    scanf("%s", message);
    fprintf(stderr, "message=\"%s\"\n", message);

    // algo
    int messageLen = (int)strlen(message);
    if (strcmp(operation, "ENCODE") == 0) {
        for (int i = 0; i < messageLen; i++) {
            inc_char(&message[i], pseudoRandomNumber + i);
            // fprintf(stderr, "i=%d, message=\"%s\"\n", i, message);
            message[i] = rotors[2][rotors[1][rotors[0][message[i] - 'A'] - 'A'] - 'A'];
        }
    } else {
        for (int i = 0; i < messageLen; i++) {
            message[i] = decode(message[i], rotors[2]);
            message[i] = decode(message[i], rotors[1]);
            message[i] = decode(message[i], rotors[0]);
            // fprintf(stderr, "i=%d, message=\"%s\"\n", i, message);
            inc_char(&message[i], - (pseudoRandomNumber + i));
        }
    }

    printf("%s\n", message);

    return 0;
}