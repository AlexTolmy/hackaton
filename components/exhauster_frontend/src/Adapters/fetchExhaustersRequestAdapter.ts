/* eslint-disable @typescript-eslint/naming-convention */
import { ExhausterType } from '../Store/types/ExhaustersMonitorReducerType';

function fetchExhaustersRequestAdapter(
  data: any,
): Record<string, ExhausterType> {
  const record = {};
  data.forEach((item) => {
    const {
      aglomachine,
      name,
      rotor_last_change,
      rotor_name,
      rotor_next_change,
      sensors,
      is_active,
    } = item;

    record[name] = {
      angloMachineName: `Агломашина №${aglomachine}`,
      exhausterName: name,
      isActive: is_active,
      rotorName: rotor_name,
      rotorLastChangeDate: new Date(rotor_last_change),
      rotorNextChangeDate: new Date(rotor_next_change),
      sensors: sensors.map((sensor) => ({
        sensorName: sensor.name,
        indicators: sensor.indicators,
      })),
    };
  });

  return record;
}

export default fetchExhaustersRequestAdapter;
