import { data, redirect } from "react-router";
import z from "zod";
import { zfd } from "zod-form-data";
import { auth } from "~/lib/.server/auth";
import type { Route } from "./+types/email";

export const loader = async () => {
  return redirect("/");
};

export const action = async ({ request }: Route.ActionArgs) => {
  const form = await request.formData();

  const { email, password } = zfd
    .formData({
      email: zfd.text(z.string().email()),
      password: zfd.text(z.string().min(1)),
    })
    .parse(form);

  const response = await auth.api.signInEmail({
    body: {
      email,
      password,
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
