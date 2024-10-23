import badget from '../assets/badget.svg'

export default function BestPhotos(props:any){
  const participants = props.top
 
  return (
    <section className="md:mx-16">
      <h2 className="font-CreepsterRegular text-secondary mb-2">
      Top 5 most voted!
      </h2>

      <ul className="flex flex-row gap-4">
      {
        participants?.map((data:any, index:any) => (
          <li className="relative" title={data.url} key={index}> 
            <img src={badget} alt="" width="50px" className='z-10 absolute top-0 right-0' />
            <img src={data.url_modified} alt="" className="h-[170px] rounded-lg z-0 top-0 relative"  />
          </li>
        ))
      }
      </ul>

    </section>
  )
}
