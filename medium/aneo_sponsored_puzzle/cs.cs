using System;
using System.Linq;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Generic;

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
class Solution
{
    public struct TrafficLight
    {
        public int distance, duration;
        public TrafficLight(int distance, int duration)
        {
            this.distance = distance;
            this.duration = duration;
        }
    }
    static void Main(string[] args)
    {
        int maxSpeed = int.Parse(Console.ReadLine());
        int lightCount = int.Parse(Console.ReadLine());
        List<TrafficLight> trafficLights = new List<TrafficLight>();
        for (int i = 0; i < lightCount; i++)
        {
            string[] inputs = Console.ReadLine().Split(' ');
            int distance = int.Parse(inputs[0]);
            int duration = int.Parse(inputs[1]);
            trafficLights.Add(new TrafficLight(distance, duration));
        }

        int correctSpeed = -1;
        for (int i = maxSpeed; i > 0 && correctSpeed == -1; i--)
        {
            correctSpeed = i;
            decimal speed = (((decimal)i) *1000.0m) / (60.0m* 60.0m);
            for (int j = 0; j < trafficLights.Count; j++)
            {
                decimal distance = trafficLights.ElementAt(j).distance;
                int duration = trafficLights.ElementAt(j).duration;
                decimal time = distance / speed;
                if ((int)(Math.Round(time / duration, 10)) % 2 == 1)
                {
                    correctSpeed = -1;
                    break;
                }

            }
        }


        Console.WriteLine(correctSpeed);
    }
}