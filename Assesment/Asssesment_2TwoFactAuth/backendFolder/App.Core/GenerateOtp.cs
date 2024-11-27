using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace App.Core
{
    public class GenerateOtp
    {
        private Random random;

        public GenerateOtp()
        {
            random = new Random();
        }

        public int GenerateOtps()
        {
            return random.Next(100000, 1000000);
        }


    }

}