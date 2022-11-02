import Navbar from "../components/Navbar";
import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const [displayEmail, setDisplayEmail] = useState("hidden");
  const [displayPassword, setDisplayPassword] = useState("hidden");
  const [displayUserName, setDisplayUserName] = useState("hidden");
  const [displayPhone, setDisplayPhone] = useState("hidden");

  const submit = () => {
    setIsloading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        password,
        userName,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setIsloading(false);
          return toast.error(res.error);
        }

        const { token, user, msg } = res;
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({ email: user.email, userName: user.userName })
        );
        toast.success(msg);
        navigate("/");
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setUserName("");
        setIsloading(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto py-24 h-screen relative overflow-hidden">
        <div className="register w-1/4 mx-auto">
          <h1 className="reg-header text-main text-3xl font-bold mb-3">
            Ro'yxatdan o'tish
          </h1>
          <p className="text-base mb-6">
            Barcha xarajatlar va daromadlaringizni bir joyda kuzatib borish
            uchun hozir ro'yxatdan o'ting!
          </p>
          {!search ? (
            <>
              <div className="full-name mb-3">
                <label htmlFor="name">
                  <span className="text-sm">To'liq ism</span>
                  <div className="flex items-center border-main border-2 rounded-xl p-1.5 mt-1">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAYAAABPPm7SAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAISSURBVHgBrVO9bhNBEJ6Zu5gIIeV4ghyUNNkGKR02HUpjU6CIynR09ptgd5EQkjtQUhwNouOcBkVKs/cGxxNwVAnnuxlmNzK5JD7LRb5q9uf7dn6+RViBYTeJOuX2CAUNgERAaP/WF9PZ2SC/fRfvkJ9/M50Af+jJY0GwIFggSBcQc1nw4OP5gW0VGO5/j7eAUxczQffTz4NfLn6v+4ySimazeFA+mc0HxZJDTYEAqzGDxAGUvSXZ4ejsVV4K9lgkCi/DcZNzQ0DT3QOB+dGKWmcqAgy29n1pERCtt9ZXoAVaRqGEnVYBlipTGTM0SXyb7PdEujXUWasAlDwRgUI6lDZFXCydQJsIeRCEH5qUFWNMDAMmehSLyJwQIyUa9cRvxPrl7Hxg1wp4kf0krisauXJ0Wej4srCCycxej+/e8D+DvkmihwQjATaEFK1h2LqC6Rd7NWov8NYcG6TQNSlSH1gkbE2VWV7oeb4geH2i/cBD8zkG7KReS922VG7DoU4E1dYa7lzIn6ea7dZYX97dhOzg7oiztf6LbXg0popF7Sunm5Bvikim09kjBCx4jX3boORC/RKRpmJ1YfquFxvC31VbC7OlCsKp7hWBBOkmIu5OwJTqw3lFPPVj7D87NhRyAkK7SHDKzPpJ3DdhWEYeKN7W/kHC3ol9Y7GpTEwjbY5ZUfAVH12/OIPwcvLVvvNe+QfYgg2ujNEj3QAAAABJRU5ErkJggg=="
                      alt="user-icon"
                      className="mr-2"
                    />
                    <input
                      type="text"
                      placeholder="Ex. Saul Ramirez"
                      className="border-0 focus:border-0 focus:outline-none w-full"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </label>
              </div>
              <div className="phone-number mb-10">
                <label htmlFor="number">
                  <span className="text-sm">Telefon nomer</span>
                  <div className=" border-main border-2 rounded-xl p-1.5 mt-1">
                    <PhoneInput
                      international
                      defaultCountry="UZ"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={setPhone}
                      required
                    />
                  </div>
                </label>
              </div>
              <button className="bg-main w-full block text-white font-medium p-1.5 rounded-xl mb-2">
                <Link to="?step=2" className="w-full block">
                  Keyingi
                </Link>
              </button>
            </>
          ) : (
            <>
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
                      required
                    />
                  </div>
                  <div className={`${displayEmail} mt-2`}>
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
                      required
                    />
                  </div>
                  <div className={`${displayPassword} mt-2`}>
                    <span className="text-sm text-red-600 ">
                      To'ldirish majburiy!
                    </span>
                  </div>
                </label>
              </div>
              <div className=" mb-8">
                <label htmlFor="userName">
                  <span className="text-sm">Foydalanuvchi nomi</span>
                  <div className="flex items-center border-main border-2 rounded-xl p-1.5 mt-1">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARTSURBVHgBfVVfaJtVFD8n+VrXTmiFDpdRbFS0pe6hWmGdjhpfZBBmG+ufjg2MuE58qg59EGFd3yo42B7bWdYpuCld04pDZS8tojihTWSwrhM1nX9WbMV0s9lIm3s899x7v3yJm1/4vtxz7j2/8/9chP953oil6vOFTf2IECMFUWY1ARASQg4IMgQwxVRq9Nv44p0w8HbMZMcX0SqEkwgUI3eQtRAJRUBOkpiLWuXYuioMjn2XyFZihSoZfTvO9Xuk0mDBGZPMK5SAkn6J/SCjjRS+XIV3zfXt/LK/Ei8cJA50nBtg0SG2dlOFl2WeGhcgyNaLGgK1u71xH8z99vEMVJ54lS0HpGNOVqJQGUAbGqLANpb4/BFPOWxvjl6IH/cVJDtS0ZDy0ixSr4UlsD4a/3Ra+eMbFeDpyKFZg5GVdQ4L2Daaji96kgiqGuC9OgMKqMqU2HSKZSDcJ+ON+NhTWyH/zwZOfXAFVv7Igztry6COqtUYr57GZFsqCtXhX0hXn2gPhiLAA4P+7IGHoLuvGS7P/gUN22qhIVIDh/fPwK9XbpCrLKOH/wvFe0JFL9ztKsRWjakMMUWh0OalJ+KNAj55YgGGXv8G3uo6L4qe6X3AyijxXleYllGe169D1EXOar86wJwqhQlq766ClWt5OP729zA3s+R8EksbIrUa3re81DsQYwWqjYRnTQ0ImgSiWJ3oa5YAaCVXF1Zh+dpNShx8GFvaG2BkMG2b0IXTV9TkMb/O8tAoQJtNk9iEAYevTv8Es2z5vkPboZlBd0VqUPNTI5fh68+vOrcNkJ83ut8zrlEgOkaRJp872AIJficYRFu+n8E/OnoR2mMR2L33QeGnOB/kDCNnqN8v4PE3y6xosFK0QOee+0QBg9DEyLzEWdPvDu+Sc5p/dni+VGHoNNhWUdIrqx7vZBmwSdekDDT769zTBPOzK+BA/vw9Tx8evYj56wVY/HEV1q5vuCaW7CpyVcpZBRNl/mZCxaKaJt8lM9n0obUb6z6t357XWvDQ+ztgS2QzrbESkJKUwpB/NxBLJa/3NqZ0o9XfxOLfxhoJIOqqan28AQ+f6IRl7tJljn8rJ3Z8eF57BJWPaR3CUMgf6RKsMGA0nFn65Nb2rS/GmI6SzZSOpwbV4Fu2bYY8e3P+7M/w2ckFMcIlklzH+kMTbTtpPp46k+k5JRu9baejCqp52FG9Tk6pzByAHWS2nCtHiAMvlSLmCrD+6GRmb1YunDO8YPkjZIKKfipMbA2hgdE0X+mM3Yfys3wvHNHgAIEL59LSpxdaI89rM2K2663rZsYb+8uGYdkQ9EsUaXA889J7bq/sRru0ND79yL0v5BhmJ5sSuNWkGdEVvNUgN4vUu95DvgNIvTP+Q+9QZeD+83RzTsIUHmDRJAUGoLWenCJ08wpomryq5ES6Z7ES67YKyhSpcJci1c1N2GbmlrYWsqwmy4meUaFbxyYzr+TuhPEvfvilHebAvTEAAAAASUVORK5CYII="
                      alt="password-icon"
                      className="mr-2"
                    />
                    <input
                      type="text"
                      placeholder="Ex. Saul Ramirez"
                      className="border-0 focus:border-0 focus:outline-none w-full"
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                        if (e.target.value === "") {
                          setDisplayUserName("block");
                        } else {
                          setDisplayUserName("hidden");
                        }
                      }}
                      required
                    />
                  </div>
                  <div className={`${displayUserName}`}>
                    <span className="text-sm text-red-600 ">
                      To'ldirish majburiy!
                    </span>
                  </div>
                </label>
              </div>
              <button
                className="bg-main w-full block text-white font-medium p-1.5 rounded-xl mb-2"
                onClick={submit}
              >
                {isLoading ? "Loading" : "Qabul qilish"}
              </button>
              <ToastContainer />
            </>
          )}
          <div>
            <span className="text-sm">
              Accountingiz mavjudmi? <span> </span>
              <span>
                <Link to="/loginpage" className="text-main font-semibold">
                  Kirish
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
