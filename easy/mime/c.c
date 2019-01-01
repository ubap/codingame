#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>

char* string_tolower(char* str) {
    int i = 0;
    while( str[i] ) {
      str[i] = tolower(str[i]);
      i++;
    }
    return str;
}

char* extract_ext(char* str) {
    int len = strlen(str);
    int i = len - 1;
    while ( i >= 0) {
        if (str[i] == '.')
            return &str[i+1];
        i--;
    }
    return NULL;
}

typedef struct {
    char* ext;
    char* mime_type;
} extension;

int main()
{
    int N; // Number of elements which make up the association table.
    scanf("%d", &N);

    extension* descs = malloc(sizeof(extension) * 10000);

    int Q; // Number Q of file names to be analyzed.
    scanf("%d", &Q);
    for (int i = 0; i < N; i++) {
        extension desc;
        desc.ext = malloc(11); // file extension
        desc.mime_type = malloc(51); // MIME type.
        scanf("%s%s", desc.ext, desc.mime_type); fgetc(stdin);
        string_tolower(desc.ext);
        descs[i] = desc;
    }
    for (int i = 0; i < Q; i++) {
        char FNAME[501]; // One file name per line.
        scanf("%s", FNAME); fgetc(stdin);
        string_tolower(FNAME);
        char* ext = extract_ext(FNAME);
        if (ext == NULL) {
            printf("UNKNOWN\n");
            continue;
        }
        char* mime = "UNKNOWN";
        for (int j = 0; j < N; j++) {
            extension desc = descs[j];
            // printf("%s == %s , %d\n", desc.ext, ext, strcmp(desc.ext, ext));
            if (strcmp(desc.ext, ext) == 0) {
                // printf("setting mime type %s\n", desc.mime_type);
                mime = desc.mime_type;
                break;
            }
        }
        printf("%s\n", mime);
    }

    return 0;
}