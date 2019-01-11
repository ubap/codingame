#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int is_prime(int n) {
    if (n <= 3) {
        return n > 1;
    } else if (n % 2 == 0 || n % 3 == 0) {
        return 0;
    }
    int i = 5;
    while (i*i <= n) {
        if (n % i == 0 || n % (i+2) == 0) {
            return 0;
        }
        i++;
    }
    return 1;
}

long long mod_of_pow(long long  n, long long  pow, long long  mod) {
    long long pows[33];
    pows[1] = n;
    for (int i = 2; (1 << (i-1)) <= pow; i++) {
        pows[i] = pows[i-1]*pows[i-1] % mod;
    }
    long long mult = 1;
    for (int i = 0; (1 << i) <= pow; i++) {
        if (pow & (1<<i)) {
            mult *= pows[i+1];
            mult %= mod;
        }
    }
    return mult % mod;
}

int main()
{
    int n;
    scanf("%d", &n);

    if (is_prime(n)) {
        printf("NO\n");
        return 0;
    }
    for (int i = 1; i <= 1000000; i++) {
        if (mod_of_pow(i, n, n) != i % n) {
            printf("NO\n");
            return 0;
        }
    }

    printf("YES\n");

    return 0;
}