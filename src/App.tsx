import { useState } from 'react'
import {
  Button,
  IconButton,
  TextInput,
  TextArea,
  Select,
  MultiSelect,
  Checkbox,
  Switch,
  DatePicker,
  TimePicker,
  ColorPicker,
  FileUpload,
  InfoModal,
  DeleteModal,
  DialogModal,
  ProfileAvatar,
  FormikTextInput,
  FormikTextArea,
  FormikSelect,
  FormikMultiSelect,
  FormikCheckbox,
  FormikSwitch,
  FormikDatePicker,
  FormikColorPicker,
  FormikFileUpload,
} from './components'
import { Formik, Form } from 'formik'
import {
  Package,
  Sparkles,
  MousePointer,
  Layers,
  FormInput,
  FolderLock,
  User,
  CheckCircle,
  Mail,
  Lock,
  Search,
  Key,
  Shield,
  Trash2,
  Bell,
  Heart,
  Share2,
  Edit,
  Download,
  BookOpen,
  Table2,
} from 'lucide-react'
import { Docs } from './components/docs/Docs'
import { TableDemo } from './components/table/TableDemo'

export default function App() {
  const [activeTab, setActiveTab] = useState<'docs' | 'buttons' | 'inputs' | 'modals' | 'media' | 'formik' | 'table'>('docs')

  // Button interactive states
  const [btnLoading, setBtnLoading] = useState(false)

  // Standard Inputs states
  const [textVal, setTextVal] = useState('Jane Doe')
  const [emailVal, setEmailVal] = useState('jane.doe@enterprise.com')
  const [passVal, setPassVal] = useState('SuperSecretPassword123!')
  const [areaVal, setAreaVal] = useState('This is a multi-line text input with automatic character counting.')
  const [selectVal, setSelectVal] = useState('org_admin')
  const [multiSelectVal, setMultiSelectVal] = useState<string[]>(['users:read', 'users:create'])
  const [checkboxVal, setCheckboxVal] = useState(true)
  const [switchVal, setSwitchVal] = useState(true)
  const [dateVal, setDateVal] = useState('2026-09-15')
  const [timeVal, setTimeVal] = useState('14:30')
  const [colorVal, setColorVal] = useState('#3B82F6')
  const [filesVal, setFilesVal] = useState<File[]>([])

  // Modals state
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Avatar state
  const [avatarShape, setAvatarShape] = useState<'circle' | 'square' | 'rounded' | 'squircle'>('circle')
  const [avatarStatus, setAvatarStatus] = useState<'online' | 'offline' | 'busy' | 'away'>('online')

  // Formik submission result state
  const [submittedData, setSubmittedData] = useState<any>(null)

  const SELECT_OPTIONS = [
    { value: 'super_admin', label: 'Super Admin', description: 'Full master access', icon: <Shield className="w-4 h-4 text-rose-400" /> },
    { value: 'org_admin', label: 'Organization Admin', description: 'Manages teams and roles', icon: <Key className="w-4 h-4 text-blue-400" /> },
    { value: 'compliance', label: 'Compliance Officer', description: 'Security audit access', icon: <CheckCircle className="w-4 h-4 text-amber-400" /> },
    { value: 'viewer', label: 'Read-only Analyst', description: 'View only access', icon: <Search className="w-4 h-4 text-slate-400" /> },
  ]

  const MULTI_OPTIONS = [
    { value: 'users:read', label: 'users:read', description: 'Read user directory' },
    { value: 'users:create', label: 'users:create', description: 'Invite new identities' },
    { value: 'users:delete', label: 'users:delete', description: 'Deactivate identities' },
    { value: 'audit:export', label: 'audit:export', description: 'Download CSV compliance logs' },
    { value: 'settings:update', label: 'settings:update', description: 'Modify security bounds' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Banner & Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-xs">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              Enterprise React Component Library
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400">
                NPM Suite
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Zero-dependency UI components with full Formik integration
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Sparkles className="w-3.5 h-3.5 text-blue-400" />}
            onClick={() => setActiveTab('formik')}
          >
            Formik Playground
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 flex-1 flex flex-col gap-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto select-none">
          {[
            { id: 'docs', label: 'Documentation', icon: BookOpen },
            { id: 'inputs', label: 'Inputs & Selects', icon: FormInput },
            { id: 'buttons', label: 'Buttons & Icons', icon: MousePointer },
            { id: 'modals', label: 'Modal Suite', icon: FolderLock },
            { id: 'media', label: 'Profile Avatars', icon: User },
            { id: 'formik', label: 'Formik Live Validation', icon: Layers },
            { id: 'table', label: 'Data Table', icon: Table2 },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* TAB 0: DOCUMENTATION */}
        {activeTab === 'docs' && (
          <div className="animate-in fade-in duration-200">
            <Docs />
          </div>
        )}

        {/* TAB 1: INPUTS & SELECTS */}
        {activeTab === 'inputs' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Text Inputs Row */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
                <FormInput className="w-4 h-4 text-blue-400" />
                Text, Password, Search & Area Inputs
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <TextInput
                  label="Full Name"
                  labelClassName='ml-2'
                  placeholder="Enter full name"
                  value={textVal}
                  className='rounded-2xl!'
                  onChange={(e) => setTextVal(e.target.value)}
                  required
                  // leftIcon={<User className="w-4 h-4" />}
                  // clearable
                  // onClear={() => setTextVal('')}
                  helperText="Clearable with trailing icon"
                />

                <TextInput
                  label="Corporate Email"
                  type="email"
                  className='rounded-2xl!'
                  placeholder="name@company.com"
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  required
                  leftIcon={<Mail className="w-4 h-4" />}
                />

                <TextInput
                  label="Password"
                  type="password"
                  className='rounded-2xl!'
                  placeholder="Enter password..."
                  value={passVal}
                  onChange={(e) => setPassVal(e.target.value)}
                  required
                  leftIcon={<Lock className="w-4 h-4" />}
                  helperText="Interactive eye visibility toggle"
                />
              </div>

              <TextArea
                label="Multi-line Text Area"
                className='rounded-2xl!'
                placeholder="Type descriptive content here..."
                value={areaVal}
                onChange={(e) => setAreaVal(e.target.value)}
                showCount
                maxLength={200}
                helperText="Dynamic character limit counter with near-capacity warning"
              />
            </div>

            {/* Selects & Dropdowns */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
                <Layers className="w-4 h-4 text-amber-400" />
                Select & MultiSelect Dropdowns
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Select
                  label="Single Role Select"
                  options={SELECT_OPTIONS}
                  value={selectVal}
                  onChange={setSelectVal}
                  searchable
                  clearable
                  required
                  helperText="Searchable with custom icons & descriptions"
                />

                <MultiSelect
                  label="Granular Permissions MultiSelect"
                  options={MULTI_OPTIONS}
                  value={multiSelectVal}
                  onChange={setMultiSelectVal}
                  searchable
                  required
                  maxVisibleTags={2}
                  helperText="Interactive pill tags with '+N more' overflow counter"
                />
              </div>
            </div>

            {/* Date, Time, Color & Files */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Date, Time, Color & Multi-File Upload with Live Preview
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <DatePicker
                  label="Expiration Date"
                  value={dateVal}
                  onChange={setDateVal}
                  required
                  helperText="Popup calendar with quick presets"
                />

                <TimePicker
                  label="Shift Time"
                  value={timeVal}
                  onChange={setTimeVal}
                  required
                  helperText="12h AM/PM hour & minute picker"
                />

                <ColorPicker
                  label="Brand Accent Color"
                  value={colorVal}
                  onChange={setColorVal}
                  required
                  helperText="Color swatches + custom hex code"
                />
              </div>

              <FileUpload
                label="Upload Attachments / Images"
                value={filesVal}
                onChange={setFilesVal}
                multiple
                accept="image/*,.pdf,.doc,.docx"
                maxSizeMB={5}
                maxFiles={4}
                helperText="Live image thumbnail previews, file removal, and format verification"
              />
            </div>

            {/* Toggles & Checkboxes */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                Switches & Checkboxes
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Switch
                    label="Enable Two-Factor Authentication"
                    description="Require authenticator OTP code on every login."
                    checked={switchVal}
                    onChange={setSwitchVal}
                    size="md"
                  />

                  <Switch
                    label="Large Toggle Switch"
                    description="Used for high-priority global security policies."
                    checked={switchVal}
                    onChange={setSwitchVal}
                    size="lg"
                  />
                </div>

                <div className="space-y-4">
                  <Checkbox
                    label="I verify compliance with security regulations"
                    description="All changes are recorded in the immutable audit trail."
                    checked={checkboxVal}
                    onChange={setCheckboxVal}
                    required
                  />

                  <Checkbox
                    label="Indeterminate State Checkbox"
                    description="Used when child permissions are partially selected."
                    checked={false}
                    indeterminate
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BUTTONS */}
        {activeTab === 'buttons' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Standard Button Variants */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <MousePointer className="w-4 h-4 text-blue-400" />
                  Button Variants & Themes
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => setBtnLoading(!btnLoading)}
                  >
                    Toggle Loading State: {btnLoading ? 'ON' : 'OFF'}
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="default" isLoading={btnLoading} leftIcon={<Sparkles className="w-4 h-4" />}>
                  Default (Shadcn)
                </Button>
                <Button variant="primary" isLoading={btnLoading}>
                  Primary
                </Button>
                <Button variant="secondary" isLoading={btnLoading}>
                  Secondary
                </Button>
                <Button variant="destructive" isLoading={btnLoading} leftIcon={<Trash2 className="w-4 h-4" />}>
                  Destructive
                </Button>
                <Button variant="outline" isLoading={btnLoading}>
                  Outline
                </Button>
                <Button variant="ghost" isLoading={btnLoading}>
                  Ghost
                </Button>
                <Button variant="link" isLoading={btnLoading}>
                  Link Style
                </Button>
                <Button variant="glass" isLoading={btnLoading}>
                  Glass
                </Button>
                <Button variant="shimmer" isLoading={btnLoading}>
                  Shimmer
                </Button>
                <Button variant="default" disabled>
                  Disabled
                </Button>
              </div>

              {/* Sizes Row */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Button Sizes (XS, SM, MD, LG)
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="xs" variant="secondary">Extra Small</Button>
                  <Button size="sm" variant="secondary">Small</Button>
                  <Button size="md" variant="secondary">Medium</Button>
                  <Button size="lg" variant="secondary">Large Size</Button>
                </div>
              </div>
            </div>

            {/* Icon Buttons */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <Heart className="w-4 h-4 text-rose-400" />
                Icon Buttons (Circle, Rounded, Square)
              </h2>

              <div className="flex flex-wrap items-center gap-4">
                <IconButton icon={<Heart className="w-4 h-4 text-rose-400" />} shape="circle" variant="secondary" tooltip="Like" />
                <IconButton icon={<Share2 className="w-4 h-4" />} shape="circle" variant="outline" tooltip="Share" />
                <IconButton icon={<Edit className="w-4 h-4" />} shape="rounded" variant="secondary" tooltip="Edit item" />
                <IconButton icon={<Trash2 className="w-4 h-4" />} shape="rounded" variant="danger" tooltip="Delete item" />
                <IconButton icon={<Download className="w-4 h-4" />} shape="square" variant="info" tooltip="Download" />
                <IconButton icon={<Bell className="w-4 h-4" />} shape="circle" variant="primary" tooltip="Alerts" />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MODALS */}
        {activeTab === 'modals' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <FolderLock className="w-4 h-4 text-amber-400" />
                Interactive Enterprise Modal Suite
              </h2>
              <p className="text-xs text-slate-400">
                Test the InfoModal for inspection cards, DeleteModal with safety confirmation, and DialogModal for actions.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  variant="primary"
                  onClick={() => setIsInfoOpen(true)}
                  leftIcon={<CheckCircle className="w-4 h-4" />}
                >
                  Open Info View Modal
                </Button>

                <Button
                  variant="danger"
                  onClick={() => setIsDeleteOpen(true)}
                  leftIcon={<Trash2 className="w-4 h-4" />}
                >
                  Open Delete Confirmation Modal
                </Button>

                <Button
                  variant="info"
                  onClick={() => setIsDialogOpen(true)}
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Open Dialog Action Modal
                </Button>
              </div>
            </div>

            {/* Info Modal Instance */}
            <InfoModal
              isOpen={isInfoOpen}
              onClose={() => setIsInfoOpen(false)}
              title="Identity Record Details"
              subtitle="User configuration snapshot from enterprise directory"
              badge={<span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono">ID: usr-9041</span>}
              items={[
                { label: 'Full Legal Name', value: textVal },
                { label: 'Corporate Email', value: emailVal },
                { label: 'Assigned Role', value: selectVal },
                { label: 'Selected Color Theme', value: <span className="font-mono text-xs">{colorVal}</span> },
                { label: 'MFA Status', value: <span className="text-emerald-400 font-medium">Enforced & Active</span> },
              ]}
            />

            {/* Delete Modal Instance */}
            <DeleteModal
              isOpen={isDeleteOpen}
              onClose={() => setIsDeleteOpen(false)}
              onConfirm={() => {
                alert('Item deleted successfully!')
                setIsDeleteOpen(false)
              }}
              itemName="Production Access Policy v2.4"
              requiredConfirmationText="DELETE"
            />

            {/* Dialog Modal Instance */}
            <DialogModal
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              onConfirm={() => {
                alert('Policy updated successfully!')
                setIsDialogOpen(false)
              }}
              title="Publish Policy Update?"
              description="This will roll out instant updates to all 1,284 connected identities."
              iconType="warning"
              confirmText="Publish Changes"
              confirmVariant="primary"
            >
              <p className="text-xs text-slate-300 leading-relaxed">
                Ensure you have peer reviewed the changes in staging before committing to production.
              </p>
            </DialogModal>
          </div>
        )}

        {/* TAB 4: PROFILE AVATARS */}
        {activeTab === 'media' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <User className="w-4 h-4 text-blue-400" />
                Profile Image Viewer & Avatars
              </h2>

              {/* Controls */}
              <div className="flex flex-wrap gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">Shape:</span>
                  {(['circle', 'rounded', 'squircle', 'square'] as const).map((s) => (
                    <Button
                      key={s}
                      size="xs"
                      variant={avatarShape === s ? 'primary' : 'outline'}
                      onClick={() => setAvatarShape(s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">Status Dot:</span>
                  {(['online', 'busy', 'away', 'offline'] as const).map((st) => (
                    <Button
                      key={st}
                      size="xs"
                      variant={avatarStatus === st ? 'info' : 'outline'}
                      onClick={() => setAvatarStatus(st)}
                    >
                      {st}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Size Showcase */}
              <div className="space-y-3 pt-2">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Sizes: XS, SM, MD, LG, XL, 2XL
                </span>
                <div className="flex flex-wrap items-end gap-5">
                  <ProfileAvatar size="xs" name="Alexander Wright" shape={avatarShape} status={avatarStatus} showStatus />
                  <ProfileAvatar size="sm" name="Alexander Wright" shape={avatarShape} status={avatarStatus} showStatus />
                  <ProfileAvatar size="md" name="Alexander Wright" shape={avatarShape} status={avatarStatus} showStatus isEditable onEditClick={() => alert('Camera edit clicked!')} />
                  <ProfileAvatar size="lg" name="Elena Rostova" shape={avatarShape} status={avatarStatus} showStatus isEditable onEditClick={() => alert('Camera edit clicked!')} />
                  <ProfileAvatar size="xl" name="Sarah Connor" shape={avatarShape} status={avatarStatus} showStatus isEditable onEditClick={() => alert('Camera edit clicked!')} />
                  <ProfileAvatar size="2xl" name="David Zhao" shape={avatarShape} status={avatarStatus} showStatus isEditable onEditClick={() => alert('Camera edit clicked!')} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FORMIK PLAYGROUND */}
        {activeTab === 'formik' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Live Formik Form with Real-Time Validation
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Testing all Formik integrated components: FormikTextInput, FormikTextArea, FormikSelect, FormikMultiSelect, FormikCheckbox, FormikSwitch, FormikDatePicker, FormikColorPicker, and FormikFileUpload.
                </p>
              </div>

              <Formik
                initialValues={{
                  fullName: '',
                  email: '',
                  notes: '',
                  role: '',
                  permissions: [] as string[],
                  agreeTerms: false,
                  twoFactor: true,
                  effectiveDate: '',
                  themeColor: '#3B82F6',
                  files: [] as File[],
                }}
                validate={(values) => {
                  const errors: Record<string, string> = {}
                  if (!values.fullName) errors.fullName = 'Full Name is required'
                  if (!values.email) {
                    errors.email = 'Corporate Email is required'
                  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Invalid email address format'
                  }
                  if (!values.role) errors.role = 'Please select an assigned role'
                  if (values.permissions.length === 0) {
                    errors.permissions = 'Select at least 1 permission scope'
                  }
                  if (!values.effectiveDate) errors.effectiveDate = 'Effective date is required'
                  if (!values.agreeTerms) errors.agreeTerms = 'You must accept security governance terms'
                  return errors
                }}
                onSubmit={(values) => {
                  setSubmittedData(values)
                }}
              >
                {({ isSubmitting, resetForm }) => (
                  <Form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormikTextInput
                        name="fullName"
                        label="Full Name"
                        placeholder="e.g. John Wick"
                        required
                        leftIcon={<User className="w-4 h-4" />}
                      />

                      <FormikTextInput
                        name="email"
                        type="email"
                        label="Corporate Email"
                        placeholder="john.wick@corp.com"
                        required
                        leftIcon={<Mail className="w-4 h-4" />}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormikSelect
                        name="role"
                        label="Assign Role"
                        options={SELECT_OPTIONS}
                        required
                        searchable
                      />

                      <FormikMultiSelect
                        name="permissions"
                        label="Scope Grants"
                        options={MULTI_OPTIONS}
                        required
                        searchable
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormikDatePicker
                        name="effectiveDate"
                        label="Effective Date"
                        required
                      />

                      <FormikColorPicker
                        name="themeColor"
                        label="Badge Accent Color"
                        required
                      />
                    </div>

                    <FormikTextArea
                      name="notes"
                      label="Audit Justification Notes"
                      placeholder="Explain justification for role assignment..."
                      maxLength={150}
                      showCount
                    />

                    <FormikFileUpload
                      name="files"
                      label="Supporting Compliance Documents"
                      maxFiles={3}
                      maxSizeMB={5}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <FormikSwitch
                        name="twoFactor"
                        label="Enforce Hardware Token MFA"
                        description="Mandatory for privileged roles."
                      />

                      <FormikCheckbox
                        name="agreeTerms"
                        label="I acknowledge identity compliance guidelines"
                        description="Subject to periodic automated review."
                        required
                      />
                    </div>

                    {/* Submit Bar */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          resetForm()
                          setSubmittedData(null)
                        }}
                      >
                        Reset Form
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        isLoading={isSubmitting}
                        leftIcon={<CheckCircle className="w-4 h-4" />}
                      >
                        Submit Formik Form
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>

              {/* Form Submission Output Preview */}
              {submittedData && (
                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2 animate-in fade-in">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    Formik Submission Success (Live State Output)
                  </span>
                  <pre className="text-xs font-mono text-slate-300 p-3 bg-slate-900/80 rounded-lg overflow-x-auto border border-slate-800 leading-relaxed">
                    {JSON.stringify(
                      {
                        ...submittedData,
                        files: submittedData.files?.map((f: File) => ({ name: f.name, size: f.size, type: f.type })),
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: DATA TABLE */}
        {activeTab === 'table' && (
          <div className="animate-in fade-in duration-200">
            <TableDemo />
          </div>
        )}
      </div>
    </div>
  )
}
