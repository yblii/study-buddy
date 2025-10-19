import duck from '../../assets/ducks/duck_base.png';

export function Ducky ({name}) {
  return (
    <div className="flex flex-col items-center my-4 gap-4">
      <img
        src={duck}
        alt="Duck"
        className="w-80 h-100 object-contain"
      />
      {name != "" && (
        <p className="mt-2 text-lg font-semibold text-gray-800 p-4 rounded-lg bg-white" >
          {name}
        </p>
      )}
    </div>
  );  

};
