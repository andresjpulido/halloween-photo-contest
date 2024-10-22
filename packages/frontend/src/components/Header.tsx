import SessionIcon from "./sessionicon"
import hpclogo from "../assets/hcc.svg"
import web from "../assets/web.svg"

export default function Header(){ 
  return (
    <header className="grid grid-flow-row grid-cols-3 text-sm">
      <section className="mt-4 md:ml-16">
        <img src={hpclogo} alt="" className="h-40" />
      </section>

      <section className="mt-4">
        <h1
          className="font-HennyPennyRegular text-secondary font-extrabold text-4xl tracking-widest  text-center leading-relaxed mx-auto"
        >
          HALLOWEEN PHOTO <br />CONTEST
        </h1>
        <p className="text-center mt-4 opacity-25">
          Participate in a competition to choose the most horror and original
          halloween photo.
        </p>
      </section>

      <section>
        <img src={web} alt="" className="absolute h-52 z-0 top-0 right-0" />
        <SessionIcon />
      </section>
        
    </header>
  )
}

