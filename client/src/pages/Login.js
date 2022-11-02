import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [displayEmail, setDisplayEmail] = useState("hidden");
  const [displayPassword, setDisplayPassword] = useState("hidden");

  const handleSubmit = () => {
    setIsLoading(true);
    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setIsLoading(false);
          return toast.error(res.error);
        }

        toast(res.msg);
        navigate("/");
        setIsLoading(false);
        setEmail("");
        setPassword("");
      });
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto py-24 h-screen relative overflow-hidden">
        <div className="login w-1/4 mx-auto">
          <h1 className="log-header text-main text-3xl font-bold mb-3">
            Kirish
          </h1>
          <p className="text-base mb-6">
            Barcha xarajatlar va daromadlaringizni bir joyda kuzatib borish
            uchun hozir ro'yxatdan o'ting!
          </p>
          <div className="mb-3">
            <label htmlFor="email">
              <span className="text-sm">Elektron pochta</span>
              <div className="flex items-center border-main border-2 rounded-xl p-1.5 mt-1">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANMSURBVHgBlVTdalNZFF5rn9gpQ2HSJ+jpvEDjIKN3zVwOZWgDTsnAoBERvGv7BG18gbbXKk1vLPh3EsSfu8a7iqCn+gLpE3iKWGrSvZbf2vmzaUHcJCF77W993/rbm+mcVSkm+QvHYwvOuVlVKhJTTKT4sBLrPqlrqfrG3b252qgvjxpuXX61RCyrzDSpwaKpY5eGf6p5JY1BPBM8VQ+E3Nr9vb+3zxBaVNHx+DqTXgfwkNhtTIwfb240S9mo6O0rL+MT9gusbikIEK3d25urniK8eflFAsl5EO6fcKdU2yu16AerciWJIxrbRQAg5eX7b+Y2uUv2fElU19nxgYy3L9Z6UVnUdBQVSTij3EnLREIm7bHf/Fj70HBG6iT3nlAj+dqZ5kohifmXCCocqzuZ7kdW+fOZ1XENvdBeJugPVeEYs6IsTK+33vzz1wCLtJWk6ugCFYGMEWGtT3bt0rNV+K+hCcbH9itGBxupVERDz4dLXSPoKs071WjewCy+MQCwVIxMBFEJ1elXP8mR/x22FGR2wip+AK+9nQt2YZ4CoRTMmTw17fD/Swki1liDICA5v2K1sui9SDUMoznrSIdEDlRk0ilYg0rabQQLxYaVoELZqW4zZb3UeZRPMfwm5ASBig5L4snyDB/uOg8X+0hDKUL4wzM0Nh9sTPtImT4ZaKGwlbdDx5ppD2w3o1x4VByIcWc6NEr1VFMkp7OhcaJpDnfzAOeT4zRRwFkz56Nm2+khFPMmyS7aWiw8Xokcx9ivDrhY833Cjsd4WclxvxGhNkNEzhX7tYTWdjcrtEx1yjEn2K9j04Q5C+UQnSn/8WSrfPHpLvAFfF/vpFfrDp1phK6JLvXT3nl3dRm2DXOk3hxi31JyK9C40007CNp42Yu0eayfS92+YS3OPE6QwgIg9YfpYqmfSrmwgzRzsSPNHqSLad9uwlYisx/Rl1Y9vZENB6Hn6CnaVeUpVG27w59Xvgf9zOKh6k4cqcOdphg1wxBTVSLfrKf/tc5ztCjZT8wmH/9tnEvYBSV5J23cY1oOrwHqYM8ZUC00JGNyaB4eWVVMBMeAZOKOps+kfFYdtfNUdOTm7QYAhFe6NyaMpwy1g1rTBvnph/LG977fAN0OHedHwGgHAAAAAElFTkSuQmCC"
                  alt="email-icon"
                  className="mr-2"
                />
                <input
                  type="email"
                  placeholder="Ex: abc@gmail.com"
                  className="border-0 focus:border-0 focus:outline-none w-full"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value === "") {
                      setDisplayEmail("block");
                    } else {
                      setDisplayEmail("hidden");
                    }
                  }}
                />
              </div>
              <div className={`${displayEmail}`}>
                <span className="text-sm text-red-600 ">
                  To'ldirish majburiy!
                </span>
              </div>
            </label>
          </div>
          <div className=" mb-3">
            <label htmlFor="password">
              <span className="text-sm">Parol</span>
              <div className="flex items-center border-main border-2 rounded-xl p-1.5 mt-1">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAVCAYAAACkCdXRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALXSURBVHgBnVRPT1NBEJ/ZvlasRssnoNxNeCSSlJPlpniwJRqMBylBEj1B/ALCJ6DeDMQEYyJ60FYSIPHS3tBIYol6tp9AW6UN7dudcfa91mD7SqKzef92fvPb387MPoQBdm9ydzkCeIMRXQROAHCFAYuK4NmT99eqYTHYO5FL7SWjSAUEdLtzbIGCZPZDvoGmmY2P1yu9saqPnUzJELmaqEpsptpnWsMb+9NIZKaIqWxIjxpFpYXxnZFTld2deLskj7yoqGKcxjfL2VpvwNzl7QIgZ4i5/PwgMzVQGRHlRBW0qD0fRuSvrs28NqKRKZ1zC4lQsow4tN2eAF8e3CrDANusZGuazaFg4Ri027fN5XQhUWvGlhqtxgoi1hLx83nV8ZEMJUNiGRT5c/Xm8ZzkM3kuNrQ5FImudquLixPvXIxSyRhz8XvzFzoRB4bPxgMqRumMv/MqFeWfx01saQ9kUY6qiJ19uL4/ncfFyZ1PsqYrgcV6q3EYcxyIx2KiRLHo6aiTfJzIblsTH7WbODx0YQSRc9IxNe9Ma9QhhjELePphOgv/YQupnTErJtqIJZVUEJmDdgyz+6m99IPJ7cwgv1S1Lhd6TAkl/cJmAJccqTVp0DUDsbnF1G4pDMP+Ze8aFNssM2HoqmSWPWpn1/evZjWZRG6i4PaRSZ5kd0IF4NjqDCLzjCmTUlfuSA8aMkmlodqLsU3u6xMGx+6XA519plk/Bk8tseKqJpV/Uek/FVaZ3Z+R4VhmhFBh4LW8GkQiCfEmPOZqGMaIDrSEASfbioSyGcYfxkg+mFzD7XoYRqIFF1TQISknQri0wtfbh/IYh1NM4m0warnZ1qjbY3fT3UrDP1rG3UpKvGvjNRxVcObSq0fyf1oR8k4RfKG2JvZYcvANJ361/qEF6PoCVPH159msevNldlXYV2W67vdcBxrkw36jLRjbdHQblP/4oCYvRRNpzlv8bwRxsAAOPrgtAAAAAElFTkSuQmCC"
                  alt="password-icon"
                  className="mr-2"
                />
                <input
                  type="password"
                  placeholder="**********"
                  className="border-0 focus:border-0 focus:outline-none w-full"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value === "") {
                      setDisplayPassword("block");
                    } else {
                      setDisplayPassword("hidden");
                    }
                  }}
                />
              </div>
              <div className={`${displayPassword}`}>
                <span className="text-sm text-red-600 ">
                  To'ldirish majburiy!
                </span>
              </div>
            </label>
          </div>
          <div className="forget mb-3">
            <span>
              <Link to="/forgetpage" className="text-sm text-main">
                Parolni unutdingizmi?
              </Link>
            </span>
          </div>
          <button
            className="bg-main w-full block text-white font-medium p-1.5 rounded-xl mb-2"
            onClick={handleSubmit}
          >
            {isLoading ? "Loading" : "Kirish"}
          </button>
          <ToastContainer />
          <div>
            <span className="text-sm">
              Accountingiz mavjud emasmi? <span> </span>
              <span>
                <Link to="/register-page" className="text-main font-semibold">
                  Ro'yxatdan o'tish
                </Link>
              </span>
            </span>
          </div>
        </div>
        <div className="absolute -right-8 -top-36">
          <img
            src="https://www.toplink.uz/static/media/right1.50725cf7dc275b7393f5.png"
            alt=""
          />
        </div>
        <div className="absolute -left-20 -bottom-60">
          <img
            src="https://www.toplink.uz/static/media/left1.56e1ee004ec57779d5b7.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
