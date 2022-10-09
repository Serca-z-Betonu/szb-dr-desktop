import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { PatientContext } from "../pages/patients/[patientId]";
import { fetchHistory } from "../utils/fetchers.util";
import { formatStringToDateChart } from "../utils/functions.util";
import { PatientContextType } from "../utils/types.util";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export default function History() {
  const { patientId } = useContext<PatientContextType>(PatientContext);
  const EVENT_TYPE = {
    ADVISE: "Porada",
    PROCEDURE: "Procedura",
  };

  const { data: histories, isLoading } = useQuery(["histories"], async () => {
    const result = await fetchHistory(patientId);
    return result;
  });

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col gap-4 my-2">
      <>
        {histories!.map((history, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-8">
            <div className="card-sm sticky top-[110px] w-2/4 justify-self-end">
              <p>{formatStringToDateChart(history.timestamp)}</p>
              <p>{EVENT_TYPE[history.medical_event_type]}</p>
              <p>{history.summary}</p>
            </div>
            <p className="w-1/2">{history.description}</p>
          </div>
        ))}
      </>
    </div>
  );
}
