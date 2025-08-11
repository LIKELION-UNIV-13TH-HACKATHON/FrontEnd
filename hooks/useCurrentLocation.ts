import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";

export type GeoCoords = { latitude: number; longitude: number };
export type LocStatus =
  | "idle"
  | "loading"
  | "nostervice"
  | "denied"
  | "ready"
  | "error";

type Options = {
  accuracy?: Location.LocationAccuracy;
  timeoutMs?: number; // 현재 위치 타임아웃
  useLastKnownFallback?: boolean;
  requestOnMount?: boolean;
};

export function useCurrentLocation(opts: Options = {}) {
  const {
    accuracy = Location.Accuracy.Balanced,
    timeoutMs = 8000,
    useLastKnownFallback = true,
    requestOnMount = true,
  } = opts;

  const mounted = useRef(true);
  const [status, setStatus] = useState<LocStatus>("idle");
  const [coords, setCoords] = useState<GeoCoords | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mounted.current = true;
    if (requestOnMount) request();
    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function request() {
    try {
      setStatus("loading");
      setError(null);

      const services = await Location.hasServicesEnabledAsync();
      if (!services) {
        setStatus("nostervice");
        setError("위치 서비스가 꺼져 있습니다.");
        return;
      }

      const perm = await Location.getForegroundPermissionsAsync();
      let st = perm.status;
      if (st !== Location.PermissionStatus.GRANTED && perm.canAskAgain) {
        const ask = await Location.requestForegroundPermissionsAsync();
        st = ask.status;
      }
      if (st !== Location.PermissionStatus.GRANTED) {
        setStatus("denied");
        setError("위치 권한이 거부되었습니다.");
        return;
      }

      const current = (async () => {
        const res = await Location.getCurrentPositionAsync({ accuracy });
        return {
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
        };
      })();

      const timeout = new Promise<null>((r) =>
        setTimeout(() => r(null), timeoutMs)
      );
      const result = (await Promise.race([
        current,
        timeout,
      ])) as GeoCoords | null;

      if (!mounted.current) return;

      if (result) {
        setCoords(result);
        setStatus("ready");
      } else if (useLastKnownFallback) {
        const last = await Location.getLastKnownPositionAsync();
        if (last) {
          setCoords({
            latitude: last.coords.latitude,
            longitude: last.coords.longitude,
          });
          setStatus("ready");
        } else {
          setStatus("error");
          setError("현재 위치를 가져오지 못했습니다.");
        }
      } else {
        setStatus("error");
        setError("현재 위치를 가져오지 못했습니다.");
      }
    } catch (e: any) {
      if (!mounted.current) return;
      setStatus("error");
      setError(e?.message ?? "위치 조회 실패");
    }
  }

  return { status, coords, error, request };
}
