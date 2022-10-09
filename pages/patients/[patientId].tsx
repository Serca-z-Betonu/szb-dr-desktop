import type { NextPage } from "next";
import { createContext, useState } from "react";
import Layout from "../../components/layout.component";
import PatientPreview from "../../components/patient-preview.component";
import { Tabs } from "../../components/tabs.component";
import { fetchPatient } from "../../utils/fetchers.util";
import { PatientContextType, PatientType } from "../../utils/types.util";

export const PatientContext = createContext<PatientContextType>({
  patientId: "",
});

type Props = {
  patient: PatientType;
};

export async function getServerSideProps({ params: { patientId } }: any) {
  const patient = await fetchPatient(patientId);

  return {
    props: { patient },
  };
}
const PatientProfile = ({ patient }: Props) => {
  return (
    <Layout>
      <div className="w-3/4  mx-auto my-4 flex flex-col gap-8">
        <div className="card min-w-fit grid grid-cols-[1fr_2fr_1fr]">
          <div className="flex flex-col gap-4">
            <div className="flex-1 grid place-items-center self-start">
              <span className="material-icons text-9xl text-teal-900 ">
                account_circle
              </span>
            </div>
            <div className="mt-auto h-fit">
              <p className="text-md w-max">Wiek: {patient.age}</p>
              <p className="text-md w-max">
                Płeć: {patient.sex === "MALE" ? "Mężczyzna" : "Kobieta"}
              </p>
              <p className="text-md w-max">
                Data urodzenia: {patient.birth_date}
              </p>
            </div>
          </div>
          <ul className="grid auto-cols-auto text-center lg:flex lg:items-center lg:justify-around ">
            <li>
              <p className="text-lg text-teal-700">Imię</p>
              <p className="text-lg">{patient.name}</p>
            </li>
            <li>
              <p className="text-lg text-teal-700">Nazwisko</p>
              <p className="text-lg">{patient.surname}</p>
            </li>
            <li>
              <p className="text-lg text-teal-700">PESEL</p>
              <p className="text-lg">{patient.pesel}</p>
            </li>
          </ul>
          <div className="grid place-items-center">
            <span className="material-icons text-9xl text-teal-900 ">
              favorite
            </span>
          </div>
        </div>
        <PatientContext.Provider
          value={{ patientId: patient.patient_id.toString() }}
        >
          <Tabs />
        </PatientContext.Provider>
      </div>
    </Layout>
  );
};

export default PatientProfile;
