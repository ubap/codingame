#include <stdlib.h>
#include <stdio.h>
#include <string.h>

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
int main()
{
    int n;
    scanf("%d", &n); fgetc(stdin);
    for (int i = 0; i < n; i++) {
        char card[20];
        fgets(card, 20, stdin);
    }

    // Write an action using printf(). DON'T FORGET THE TRAILING \n
    // To debug: fprintf(stderr, "Debug messages...\n");

    printf("YES or NO\n");

    return 0;
}