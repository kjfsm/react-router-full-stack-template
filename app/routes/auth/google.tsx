import { data, redirect } from "react-router";
import { auth } from "~/lib/.server/auth";

export const loader = async () => {
  return redirect("/");
};

export const action = async () => {
  const response = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: "/todos",
    },
    asResponse: true,
  });

  if (!response.ok) {
    return data(
      { error: "Googleログインの開始に失敗しました" },
      { status: 400 },
    );
  }

  const result = await response.json();
  if (!result.url) {
    return data(
      { error: "Googleログインの開始に失敗しました" },
      { status: 400 },
    );
  }

  return redirect(result.url, { headers: response.headers });
};
