-- Auto-generated code below aims at helping you parse
-- the standard input according to the problem statement.
-- ---
-- Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.

-- lightX: the X position of the light of power
-- lightY: the Y position of the light of power
-- initialTX: Thor's starting X position
-- initialTY: Thor's starting Y position
next_token = string.gmatch(io.read(), "[^%s]+")
lightX = tonumber(next_token())
lightY = tonumber(next_token())
tx = tonumber(next_token())
ty = tonumber(next_token())

-- game loop
while true do
    remainingTurns = tonumber(io.read()) -- The remaining amount of turns Thor can move. Do not remove this line.
    
    if (lightY < ty) then
      io.write("N")
      ty = ty - 1
    end
    if (lightY > ty) then
      io.write("S")
      ty = ty + 1
    end
    if (lightX < tx) then
      io.write("W")
      tx = tx - 1
    end
    if (lightX > tx) then
      io.write("E")
      tx = tx + 1
    end
    
    print("")
end