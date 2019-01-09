#include <stdlib.h>
#include <stdio.h>
#include <string.h>


struct traffic_light_t {
    int distance, duration;
};
int main()
{
    int maxSpeed;
    scanf("%d", &maxSpeed);


    int lightCount;
    scanf("%d", &lightCount);
    struct traffic_light_t traffic_lights[10000];
    for (int i = 0; i < lightCount; i++) {
        int distance;
        int duration;
        scanf("%d%d", &distance, &duration);
        traffic_lights[i].distance = distance;
        traffic_lights[i].duration = duration;
    }

    int correctSpeed = -1;
    for (int i = maxSpeed; i > 0 && correctSpeed == -1; i--) {
        correctSpeed = i;
        long double speed = (((long double)i) * 1000.) / (60.*60.);
        // test different speeds
        // at distance time in seconds
        for (int j = 0; j < lightCount; j++) {
            double distance = traffic_lights[j].distance;
            int duration = traffic_lights[j].duration;
            long double time = distance / speed;
            if ((int)(time / duration) % 2 == 1) {
                correctSpeed = -1;
                fprintf(stderr, "wrong speed %d\n", i);
                break;
            }
        }
    }

    printf("%d\n", correctSpeed);

    return 0;
}