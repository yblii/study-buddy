import duck from '../../assets/duck_placeholder.jpg'

export function Ducky ({name}) {
  return (

    <div className="flex flex-col items-center my-4 gap-4">
      <img
        src={duck}
        alt="Duck"
        className="w-80 h-80 object-cover"
      />
      {name != "" && (
        <p className="mt-2 text-lg font-semibold text-gray-800 p-4 rounded-lg bg-white" >
          {name}
        </p>
      )}
    </div>
  );

};
