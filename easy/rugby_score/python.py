def calc_score(combination):
    return combination[0] * 5 + combination[1] * 2 + combination[2] * 3

n = int(input())

combinations = []

tries = -1
while True:
    tries += 1
    if calc_score([tries, 0, 0]) == n:
        combinations.append([tries, 0, 0])
        continue
    if calc_score([tries, 0, 0]) > n:
        break

    for transformation in range (0, tries + 1):
        if calc_score([tries, transformation, 0]) == n:
            combinations.append([tries, transformation, 0])
            continue
        if calc_score([tries, transformation, 0]) > n:
            break
        penalty = 0
        while True:
            penalty += 1
            if calc_score([tries, transformation, penalty]) == n:
                combinations.append([tries, transformation, penalty])
                continue
            if calc_score([tries, transformation, penalty]) > n:
                break

# output
for combination in combinations:
    combination_s = [str(el) for el in combination]
    print(" " . join(combination_s))