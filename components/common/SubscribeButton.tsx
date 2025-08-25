import React, { useCallback, useMemo, useState } from "react";
import { Pressable } from "react-native";
import EmptyStar from "@/assets/images/emptystar.svg";
import FilledStar from "@/assets/images/filledstar.svg";
import {
  sendSubscribe,
  deleteSubscribe,
} from "@/util/api/customer/sendSubscribe";
import { useShopInfoStore } from "@/store/shop/useShopInfoStore";

type SubscribeButtonProps = {
  isSubscribed?: boolean;
  onToggle?: (next: boolean) => void;
  id?: number; // shop id
  size?: number;
};

const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  isSubscribed,
  onToggle,
  id,
  size = 24,
}) => {
  const shopFromStore = useShopInfoStore(
    useCallback((s) => (id != null ? s.getShopDetail(id) : undefined), [id])
  );
  const updateShop = useShopInfoStore((s) => s.updateShop);

  const [local, setLocal] = useState<boolean | undefined>(undefined);
  const effective = useMemo(
    () => local ?? isSubscribed ?? shopFromStore?.isSubscribe ?? false,
    [local, isSubscribed, shopFromStore?.isSubscribe]
  );

  const [loading, setLoading] = useState(false);

  const handlePress = useCallback(async () => {
    if (loading) return;
    const next = !effective;
    setLocal(next);
    setLoading(true);
    try {
      if (id == null) {
        onToggle?.(next);
        return;
      }
      if (next) {
        await sendSubscribe(id);
      } else {
        await deleteSubscribe(id);
      }
      updateShop(id, { isSubscribe: next });
      onToggle?.(next);
    } catch (e) {
      setLocal(effective);
      console.error("subscribe toggle failed", e);
    } finally {
      setLoading(false);
    }
  }, [loading, effective, id, onToggle, updateShop]);

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={effective ? "구독 취소" : "구독"}
      disabled={loading}
      hitSlop={8}
    >
      {effective ? (
        <FilledStar width={size} height={size} />
      ) : (
        <EmptyStar width={size} height={size} />
      )}
    </Pressable>
  );
};

export default SubscribeButton;
