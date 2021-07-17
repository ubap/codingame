#!/usr/bin/env python2.7


class Dice(str):
    pass


def read_number(expr, pos):
    number = ''
    while pos < len(expr) and '0' <= expr[pos] <= '9':
        number += expr[pos]
        pos += 1
    return [int(number), pos]


def get_operator_priority(c):
    if c == '>': return 1
    if c == '+' or c == '-': return 2
    if c == '*': return 3
    return None


def read_symbol(expr, pos):
    c = expr[pos]
    if get_operator_priority(c) or c == '(' or c == ')':
        return [c, pos + 1]
    elif c == 'd':
        read = read_number(expr, pos + 1)
        return [Dice('d' + str(read[0])), read[1]]
    else:
        return read_number(expr, pos)


def parse_infix(expr):
    exit = []
    stack = []
    pos = 0
    while pos < len(expr):
        [symbol, pos] = read_symbol(expr, pos)
        if type(symbol) == int:
            exit.append(symbol)
        elif type(symbol) == Dice:
            # for now treat dice as numbers
            exit.append(symbol)
        elif symbol == '(':
            stack.append(symbol)
        elif symbol == ')':
            while stack[len(stack) - 1] != '(':
                exit.append(stack.pop())
            stack.pop()
        elif type(symbol) == str:
            # operator
            while stack and get_operator_priority(symbol) <= get_operator_priority(stack[len(stack) - 1]):
                exit.append(stack.pop())
            stack.append(symbol)

    while stack:
        exit.append(stack.pop())

    return exit


def eval_operator(a, b, op):
    if op == '+':
        return b + a
    if op == '-':
        return b - a
    if op == '*':
        return b * a
    if op == '>':
        if b > a:
            return 1
        else:
            return 0
    raise Exception('incorrect operator')


def calc_onp(onp):
    stack = []
    for c in onp:
        if type(c) == int:
            stack.append(c)
        elif get_operator_priority(c):
            a = stack.pop()
            b = stack.pop()
            stack.append(eval_operator(a, b, c))
    return stack.pop()


def get_next_dice(onp, pos):
    while pos < len(onp):
        if type(onp[pos]) == Dice:
            return [onp[pos], pos]
        pos += 1
    return None


def add_result(results, result):
    if result not in results:
        results[result] = 1
    else:
        results[result] += 1
    results['total'] += 1


def expand_dices(onp, pos, results):
    next_dice = get_next_dice(onp, pos)
    if not next_dice:
        add_result(results, calc_onp(onp))
    else:
        pos = next_dice[1]
        dice = next_dice[0]
        n = int(dice[1:])
        for i in xrange(1, n + 1):
            onp[pos] = i
            expand_dices(onp, pos + 1, results)
            onp[pos] = dice


def main():
    expr = raw_input()
    onp = parse_infix(expr)
    results = {'total': 0}
    expand_dices(onp, 0, results)
    keys = list(results.keys())
    keys.remove('total')
    keys.sort()
    for result in keys:
        if type(result) == int:
            chance = 100. * results[result] / results['total']
            print str(result) + ' ' + str("%.2f" % round(chance, 2))


if __name__ == '__main__':
    main()
