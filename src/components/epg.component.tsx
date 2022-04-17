import React from "react";
interface IEPGComponentProps {
  channelId: string;
}
const EPGComponent = ({ channelId }: IEPGComponentProps) => {
  const [programs, setPrograms] = React.useState([]);
  React.useEffect(() => {
    const fetchPrograms = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/epg/${channelId}`
      );
      const data = await res.json();
      setPrograms(data);
    };

    fetchPrograms().catch(console.error);
  }, [channelId]);
  return programs && programs.length ? (
    <table className="w-full">
      <thead>
        <tr className="timerow">
          <td>06:00</td>
          <td>06:30</td>
          <td>07:00</td>
          <td>07:30</td>
          <td>08:00</td>
          <td>08:30</td>
          <td>09:00</td>
          <td>09:30</td>
          <td>10:30</td>
          <td>10:30</td>
        </tr>
      </thead>
    </table>
  ) : null;
};

export default EPGComponent;
