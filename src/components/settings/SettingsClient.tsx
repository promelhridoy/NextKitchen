"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Sun, Moon, Monitor, Loader2, Camera } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { profileSchema, passwordSchema, type ProfileFormValues, type PasswordFormValues } from "@/shemas/settingsSchema";

const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100";

export default function SettingsClient() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { theme, setTheme } = useTheme();
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  useEffect(() => {
    if (!isPending && !session) router.replace("/login");
  }, [isPending, session, router]);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", bio: "", website: "", instagram: "", youtube: "" },
  });

  useEffect(() => {
    if (session?.user) {
      profileForm.reset({
        name: session.user.name ?? "",
        bio: "",
        website: "",
        instagram: "",
        youtube: "",
      });
    }
  }, [session, profileForm]);

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  if (isPending) return <div className="mx-auto max-w-3xl px-4 py-10"><div className="h-96 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" /></div>;
  if (!session) return null;

  const user = session.user;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    // TODO(wire-up): upload to Cloudinary/imgBB then PATCH /api/users/me { avatar: url }
  };

  const onProfileSubmit = async (values: ProfileFormValues) => {
    setSavingProfile(true);
    try {
      // TODO(wire-up): PATCH /api/users/me with values
      await new Promise((r) => setTimeout(r, 800));
      toast.success("Profile updated");
    } catch {
      toast.error("Could not update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const onPasswordSubmit = async (values: PasswordFormValues) => {
    setSavingPassword(true);
    try {
      // TODO(wire-up): PATCH /api/users/me/password with values
      await new Promise((r) => setTimeout(r, 800));
      toast.success("Password changed successfully");
      passwordForm.reset();
    } catch {
      toast.error("Could not change password. Check your current password.");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your profile, password, and preferences</p>

      {/* Profile section */}
      <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">Profile</h2>

        <div className="mt-4 flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-2 ring-orange-500/30">
            <Image src={avatarPreview || user.image || "/default-avatar.png"} alt={user.name} fill sizes="64px" className="object-cover" />
          </div>
          <label className="flex cursor-pointer items-center gap-1.5 rounded-2xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
            <Camera size={15} /> Change Photo
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </label>
        </div>

        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input {...profileForm.register("name")} className={inputClass} />
            {profileForm.formState.errors.name && (
              <p className="mt-1 text-xs text-red-500">{profileForm.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
            <textarea {...profileForm.register("bio")} rows={3} className={`${inputClass} resize-none`} />
            {profileForm.formState.errors.bio && (
              <p className="mt-1 text-xs text-red-500">{profileForm.formState.errors.bio.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
            <input {...profileForm.register("website")} placeholder="https://yoursite.com" className={inputClass} />
            {profileForm.formState.errors.website && (
              <p className="mt-1 text-xs text-red-500">{profileForm.formState.errors.website.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Instagram username</label>
              <input {...profileForm.register("instagram")} placeholder="yourhandle" className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">YouTube channel</label>
              <input {...profileForm.register("youtube")} placeholder="YourChannel" className={inputClass} />
            </div>
          </div>

          <button
            type="submit"
            disabled={savingProfile}
            className="flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {savingProfile && <Loader2 size={15} className="animate-spin" />}
            Save Changes
          </button>
        </form>
      </section>

      {/* Password section */}
      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">Change Password</h2>
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
            <input type="password" {...passwordForm.register("currentPassword")} className={inputClass} />
            {passwordForm.formState.errors.currentPassword && (
              <p className="mt-1 text-xs text-red-500">{passwordForm.formState.errors.currentPassword.message}</p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
              <input type="password" {...passwordForm.register("newPassword")} className={inputClass} />
              {passwordForm.formState.errors.newPassword && (
                <p className="mt-1 text-xs text-red-500">{passwordForm.formState.errors.newPassword.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
              <input type="password" {...passwordForm.register("confirmPassword")} className={inputClass} />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{passwordForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={savingPassword}
            className="flex items-center gap-2 rounded-2xl bg-green-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
          >
            {savingPassword && <Loader2 size={15} className="animate-spin" />}
            Update Password
          </button>
        </form>
      </section>

      {/* Appearance section */}
      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">Appearance</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Choose how NestKitchen looks on this device</p>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { key: "light", label: "Light", icon: Sun },
            { key: "dark", label: "Dark", icon: Moon },
            { key: "system", label: "System", icon: Monitor },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => setTheme(opt.key)}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-sm font-medium transition-colors ${
                theme === opt.key
                  ? "border-orange-500 bg-orange-50 text-orange-600 dark:border-orange-500/50 dark:bg-orange-900/20 dark:text-orange-400"
                  : "border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-300"
              }`}
            >
              <opt.icon size={18} />
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      {/* Danger zone */}
      <section className="mt-6 rounded-2xl border border-red-100 bg-red-50/50 p-6 dark:border-red-900/30 dark:bg-red-900/10">
        <h2 className="font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
        <p className="mt-1 text-sm text-red-500/80 dark:text-red-400/70">
          Signing out will end your session on this device.
        </p>
        <button
          onClick={async () => {
            await signOut({ fetchOptions: { onSuccess: () => { router.push("/"); router.refresh(); } } });
          }}
          className="mt-4 rounded-2xl border border-red-300 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          Log Out
        </button>
      </section>
    </div>
  );
}