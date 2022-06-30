//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace NCMSystem.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class contact
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public contact()
        {
            this.groups = new HashSet<group>();
        }
    
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string image_url { get; set; }
        public string company { get; set; }
        public string job_title { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string website { get; set; }
        public string fax { get; set; }
        public string reason_status { get; set; }
        public int owner_id { get; set; }
        public string flag_id { get; set; }
        public string status_id { get; set; }
        public bool isActive { get; set; }
        public System.DateTime create_date { get; set; }
        public int createdBy { get; set; }
        public string reason_deactive { get; set; }
    
        public virtual user user { get; set; }
        public virtual user user1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<group> groups { get; set; }
    }
}
